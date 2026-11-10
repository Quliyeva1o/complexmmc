'use client'

import { FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

/**
 * HEX colour field with a live swatch and the browser's colour picker next to the code
 * (PLAN.md §12, step 6). The value stays a plain "#RRGGBB" string.
 */
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path: path ?? field.name })
  const valid = typeof value === 'string' && HEX.test(value)
  const full = valid && value.length === 4 ? `#${[...value.slice(1)].map((c) => c + c).join('')}` : value
  return (
    <div className="field-type text cmmc-color" style={{ width: field.admin?.width }}>
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="cmmc-color__row">
        <label className="cmmc-color__swatch" style={{ background: valid ? value : 'transparent' }} title="Rəng seç">
          <input type="color" value={valid ? (full as string) : '#000000'} onChange={(e) => setValue(e.target.value.toUpperCase())} aria-label={`${typeof field.label === 'string' ? field.label : field.name}: rəng seç`} />
        </label>
        <input
          type="text"
          className="cmmc-color__input"
          value={value ?? ''}
          placeholder="#0B9AA6"
          spellCheck={false}
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </div>
      {showError && errorMessage && <p className="cmmc-color__error">{errorMessage}</p>}
    </div>
  )
}
