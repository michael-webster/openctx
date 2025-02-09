import { describe, expect, test } from 'vitest'
import googleDocs, { parseDocumentIDFromURL, type Settings } from './index.js'

describe('googleDocs', () => {
    const SETTINGS: Settings = {}

    test('meta', async () => {
        expect(await googleDocs.meta({}, SETTINGS)).toEqual({
            name: 'Google Docs',
            mentions: {},
        })
    })
})

describe('parseDocumentIDFromURL', () => {
    test('parses valid Google Docs URL', () => {
        const id = parseDocumentIDFromURL('https://docs.google.com/document/d/abc123_/edit')
        expect(id).toBe('abc123_')
    })

    test('returns undefined for non-Google Docs URL', () => {
        const id = parseDocumentIDFromURL('https://example.com/doc/123')
        expect(id).toBeUndefined()
    })

    test('returns undefined for invalid Google Docs URL', () => {
        const id = parseDocumentIDFromURL('https://docs.google.com/document')
        expect(id).toBeUndefined()
    })

    test('returns undefined for Google Docs URL with invalid doc ID', () => {
        const id = parseDocumentIDFromURL('https://docs.google.com/document/d/!nv@lid/')
        expect(id).toBeUndefined()
    })
})
