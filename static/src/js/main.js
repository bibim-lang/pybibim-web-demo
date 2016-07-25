window.$ = window.jQuery = require('jquery');
import '../css/main.scss';

let editor;

function initMonaco() {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: [
    '{[0; @:1 = {',
    '\t[0; 72]',
    '\t[1; 69]',
    '\t[2; 76]',
    '\t[3; 76]',
    '\t[4; 79]',
    '\t[5; 32]',
    '\t[6; 87]',
    '\t[7; 79]',
    '\t[8; 82]',
    '\t[9; 76]',
    '\t[10; 68]',
    '\t[11; 10]',
    '}]}'
    ].join('\n'),
    // language: 'javascript'
  });
}

function loadMonaco() {
  window.require.config({ paths: { 'vs': 'static/vs' }});
  window.require(['vs/editor/editor.main'], function() {
      initMonaco();
  });
}

window.$(document).ready(function() {
  loadMonaco(editor);
  let $run = $('#run');
  $run.click(function () {
    $run.prop('disabled', true);
    $.post(
      "run",
      {
        code: editor.getValue(),
        stdin: ""
      }
    ).done(data => {
      let $output = $("#output");
      $output.empty();
      $output.append(data);
      $run.prop('disabled', false);
    }).fail(() => {
      let $output = $("#output");
      $output.empty();
      $output.append("코드 실행 실패");
      $run.prop('disabled', false);
    });
  });
});
