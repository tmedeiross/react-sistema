const $ = window.jQuery;

export const onLoading = () => {
  $.blockUI({
    // message: '<img src="/images/loader.gif" width="24" height="24" /> Aguarde...',
    message: 'Aguarde...',
    css: {
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: 0.5,
      color: '#fff',
    },
  });
};

export const offLoading = () => {
  setTimeout($.unblockUI, 300);
};
