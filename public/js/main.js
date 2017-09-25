(function ($, document, window) {
  $(document).ready(() => {
    $('#chooseCompanyName').on('change', function () {
      const companyName = $(this).val();
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
