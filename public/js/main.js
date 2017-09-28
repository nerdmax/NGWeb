(function ($, document, window) {
  $(document).ready(() => {
    // Copy Page
    if ($('html').has('#templateDbName').length) {
      $('#templateWebName').on('change', function () {
        $('#templateDbName').val(`${this.value}_CMS`);
      });
      console.log('has olddata');
    }
    if ($('html').has('#newDbName').length) {
      $('#newWebName').on('input', function () {
        if (this.value) {
          $('#newDbName').val(`${this.value}_CMS`);
        } else {
          $('#newDbName').val('');
        }
      });
      console.log('has olddata');
    }

    $('#newDbFile').on('change', () => {
      if ($('#newDbFile').val()) {
        $('#templateDbName').prop('disabled', true);
      } else {
        $('#templateDbName').prop('disabled', false);
      }
    });

    $('#copyForm').submit(() => {
      $('#templateDbName').prop('disabled', false);
    });

    // Modify Page
    $('#chooseCompanyName').on('change', function () {
      window.location.href = `?companyName=${encodeURIComponent(this.value)}`;
    });
  });

  // Disable the options of theme1's background color
  $('#theme1BgColor').attr('disabled', 'disabled');
  // Enable the options of theme1's when submit
  $('#modifyForm').submit(() => {
    $('#theme1BgColor').removeAttr('disabled');
  });
}($, document, window));
