import {product} from './product'
import {siteSettings} from './siteSettings'
import {homePage} from './homePage'
import {market} from './market'
import {service} from './service'
import {office} from './office'
import {faq} from './faq'
import {page} from './page'
import {navigationMenu} from './navigationMenu'
import {aboutPage} from './aboutPage'
import {solution} from './solution'

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  // Collections
  product,
  market,
  service,
  office,
  faq,
  page,
  navigationMenu,
  solution,
]
