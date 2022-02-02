import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        gjsPresetWebpage: {
          // options
        }
      },

    });

    // Experimental 

    editor.Panels.addButton
      ('options',
        [{
          id: 'save-db',
          // className: 'fa fa-floppy-o',
          label: 'Load',
          command: 'save-db',
          attributes: { title: 'Save DB' }
        }]
      );

    // Add the command
    editor.Commands.add
      ('save-db', {
        run: function (editor, sender) {
          sender && sender.set('active'); // turn off the button


          const modal = editor.Modal.setTitle('Components JSON')
            .setContent(`
                    <div id="gjs-mdl-c">
                      <form id="exportJSON">
                        <div class="gjs-export-dl">
                            <div class="gjs-cm-editor-c">
                                <div class="gjs-cm-editor" id="gjs-cm-htmlmixed">
                                    <div id="gjs-cm-title">HTML JSON</div>
                                    <div id="gjs-cm-code CodeMirror cm-s-hopscotch CodeMirror-wrap">
                                      
                                      <textarea name="html" rows="20" style="width: 98.5%;">
                                      ${JSON.stringify(editor.getComponents())}
                                      </textarea>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="gjs-cm-editor-c">
                                <div class="gjs-cm-editor" id="gjs-cm-css">
                                    <div id="gjs-cm-title">CSS JSON</div>
                                    <div id="gjs-cm-code CodeMirror cm-s-hopscotch CodeMirror-wrap">
                                      
                                      <textarea name="css" rows="20" style="width: 98.5%;">
                                      ${JSON.stringify(editor.getStyle())}
                                      </textarea>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="exportSubmit" class="gjs-btn-prim">Load</button>
                      </form>
                  </div>
                  <div style="clear:both"></div> 
                `)
            .open();

          document.getElementById('exportJSON').onsubmit = function (e) {
            e.preventDefault();
            const comp = e.target[0].value ? e.target[0].value : "[]";
            const style = e.target[1].value ? e.target[1].value : " []";

            if (e.target[0].value) {

              editor.setComponents(JSON.parse(comp));
            }
            if (e.target[1].value) {

              editor.setStyle(JSON.parse(style));
            }
            modal.close()
          }

        }
      });

    // end



    const panelManager = editor.Panels;
    // eslint-disable-next-line no-unused-vars
    var newPanel = panelManager.addPanel({
      id: 'customPanel',
      visible: true,
      buttons: [
        {
          id: 'show-json',
          className: 'fa fa-floppy-o',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(`
              <div id="gjs-mdl-c">
                        <div class="gjs-export-dl">
                            <div class="gjs-cm-editor-c">
                                <div class="gjs-cm-editor" id="gjs-cm-htmlmixed">
                                    <div id="gjs-cm-title">HTML JSON</div>
                                    <div id="gjs-cm-code CodeMirror cm-s-hopscotch CodeMirror-wrap">
                                      
                                      <textarea name="html" rows="20" style="width: 98.5%;">
                                      ${JSON.stringify(editor.getComponents())}
                                      </textarea>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="gjs-cm-editor-c">
                                <div class="gjs-cm-editor" id="gjs-cm-css">
                                    <div id="gjs-cm-title">CSS JSON</div>
                                    <div id="gjs-cm-code CodeMirror cm-s-hopscotch CodeMirror-wrap">
                                      
                                      <textarea name="css" rows="20" style="width: 98.5%;">
                                      ${JSON.stringify(editor.getStyle())}
                                      </textarea>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
                  <div style="clear:both"></div> 
              
              
              `)
              .open();
          },
        }
      ],
    });
    setEditor(editor);
  }, [])
  return (
    <>
      <div id="gjs">
      </div>
      <div id="blocks"></div>
    </>
  );
}

export default App;
