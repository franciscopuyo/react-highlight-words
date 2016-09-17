/* @flow */
import React, { PropTypes } from 'react'
import * as Chunks from './utils.js'

Highlighter.propTypes = {
  autoEscape: PropTypes.bool,
  highlightClassName: PropTypes.string,
  highlightStyle: PropTypes.object,
  searchWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  textToHighlight: PropTypes.string.isRequired,
  sanitize: PropTypes.func
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <span>s (wrapping highlighted words).
 */
export default function Highlighter ({
  autoEscape,
  highlightClassName = '',
  highlightStyle = {},
  searchWords,
  textToHighlight,
  sanitize
}) {
  const chunks = Chunks.findAll(textToHighlight, searchWords, sanitize, autoEscape)

  return (
    <span>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)

        if (chunk.highlight) {
          return (
            <mark
              className={highlightClassName}
              key={index}
              style={highlightStyle}
            >
              {text}
            </mark>
          )
        } else {
          return (
            <span key={index}>{text}</span>
          )
        }
      })}
    </span>
  )
}