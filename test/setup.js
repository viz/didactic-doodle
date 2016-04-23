import { jsdom } from 'jsdom'

let exposedProperties = [
  'window',
  'navigator',
  'document'
]

global.document = jsdom('')
global.window = document.defaultView

// Loop through the defaultView adding properties to exposedProperties
// and assigning the global property
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties = [ ...exposedProperties, property ]
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
