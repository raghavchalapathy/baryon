import React from 'react'
import { Link } from 'react-router-dom'
import Util from './common'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from '../constants/langtypes'
class QuarkUtil {
  constructor(quarkRaw, langType = LANGTYPE_ENG_LIKE, graphPath = '') {
    this.langType = langType
    this.graphPath = graphPath

    this.identity = quarkRaw.identity
    this.labels = quarkRaw.labels
    this.properties = quarkRaw.properties
	  let util = new Util()

    // These are needed in main-quark component
 	  this.name = this.getName()
 	  this.description = this.getDescription()
 	  this.image_path = this.properties.image_path
 	  this.period_str = util.period2str(quarkRaw.properties)
 	  this.url = this.properties.url
 	  this.affiliate = this.properties.affiliate
  }

  getByLang = (field) => {
    if (this.langType === LANGTYPE_JP_LIKE) {
      return this.properties[field] ? this.properties[field] : this.properties[`en_${field}`]
    } else {
      return this.properties[`en_${field}`] && (this.properties[`en_${field}`] !== "NULL") ?
             this.properties[`en_${field}`] : this.properties[field]
    }
  }
  getName = () => {
    return this.getByLang('name')
  }
  getDescription = () => {
    return this.getByLang('description')
  }
  getLinkPath = (str) => {
    if (((this.langType === LANGTYPE_JP_LIKE) && this.properties.name)
        || ((this.langType === LANGTYPE_ENG_LIKE) && this.properties.en_name)) {
      // return <a href={`/${this.getName()}`}>{this.getName()}</a>
      return <Link to={`${this.graphPath}/${this.getName()}`}>{str}</Link>
    }

    let url = window.location.href
    let arr = url.split("/");
    const scheme = arr[0]
    const domainString = arr[2]

    let prefix = ''
    if (this.langType === LANGTYPE_JP_LIKE) {
      prefix = `${scheme}//${domainString.split('.')[1]}`
    } else {
      prefix = `${scheme}//ja.${domainString}`
    }
    return <a href={`${prefix}${this.graphPath}/${this.getName()}`}>{str}</a>
  }
}
export default QuarkUtil
