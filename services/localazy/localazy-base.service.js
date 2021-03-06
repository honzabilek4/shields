'use strict'

const Joi = require('joi')
const { BaseJsonService } = require('..')

const schema = Joi.object({
  label: Joi.string(),
  message: Joi.string(),
  color: Joi.string(),
})

module.exports = class LocalazyBase extends BaseJsonService {
  static category = 'other'

  static route = this.buildRoute()

  static buildRoute(base = '', pattern = '', query) {
    const baseRoute = {
      base: `localazy${base ? `/${base}` : ''}`,
      pattern: `:projectId${pattern ? `/${pattern}` : ''}`,
    }
    return query ? { ...baseRoute, queryParamSchema: query } : baseRoute
  }

  static get documentation() {
    return `For more badges and detailed documentation of the params visit <a href="https://github.com/localazy/shields">localazy/shields</a> repository.`
  }

  static get keywords() {
    return ['l10n', 'i18n', 'localization', 'internationalization']
  }

  static defaultBadgeData = { label: 'translated', color: '#066fef' }

  static render(data) {
    return {
      ...data,
    }
  }

  async fetch({ projectId, title, content }) {
    return this._requestJson({
      schema,
      url: `https://connect.localazy.com/status/${projectId}/data`,
      options: {
        qs: {
          title,
          content,
        },
      },
    })
  }
}
