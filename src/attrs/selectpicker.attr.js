import $ from 'jquery'
import callback from 'can-view-callbacks'
import 'bootstrap-select'

/**
 * A bridge to 3rd party selectpicker. This will instantiate the plugin for the element base on "selectpicker" attribute.
 * Example:
 * ```
 *    <select selectpicker="style classes" class="selectpicker form-control show-tick">
 *      {{#each ../availableFactors}}
 *        <option data-subtext="{{lookup factorDesc i18n}}">{{lookup factorType i18n}}</option>
 *      {{/each}}
 *    </select>
 * ```
 */
callback.attr('selectpicker', (el, attrData) => {
  let $el = $(el),
    value = el.getAttribute('selectpicker')

  setTimeout(() => {
    $el.selectpicker({style: value, showSubtext: true})
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $el.selectpicker('mobile')
    }
  }, 50)

  $el.on('reset-select-picker', function () {
    $el.find('option').each((i, a) => {
      if (a.getAttribute('data-subtext')) {
        $(a).data('subtext', a.getAttribute('data-subtext'))
      }
    })
    $el.selectpicker('refresh')
  })
})
