function update() {
  var idoc = document.getElementById("iframe").contentWindow.document;

  idoc.open();
  idoc.write(editor.getValue());
  idoc.close();
}
function setupEditor() {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/html");
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", "..//notes/textfiles/file.txt", true);
  txtFile.onreadystatechange = function()
  {
      if (txtFile.readyState === 4)
      {
           // Makes sure the document is ready to parse.
           if (txtFile.status === 200)
           {
                // Makes sure it's found the file.
                editor.setValue(txtFile.responseText,1);
           }
      }
  }
  txtFile.send(null)
  //editor.setValue('a',1);

  editor.getSession().on("change", function () {
    update();
  });

  editor.focus();

  editor.setOptions({
    fontSize: "11pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
}

setupEditor();
update();

function ready() {}
