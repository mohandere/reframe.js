/* noframe.js () 🖼
  -------------
  takes 2 arguments:
  => target: targeted <element>
  => container: optional targeted <parent> of targeted <element>
  -------------
  defines the height/width ratio of the targeted <element>
  based on the targeted <parent> width
*/
export default function noframe(target, container) {
  let frames = (typeof target === 'string') ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) frames = [frames];
  for (let i = 0; i < frames.length; i += 1) {
    const frame = frames[i];
    const h = frame.offsetHeight;
    const w = frame.offsetWidth;
    const styles = frame.style;
    let maxW = `${w}px`;
    let parent = null;
    // If a targeted container <element> is present in DOM
    if (typeof container !== 'undefined') {
      // `parent` will be either <element> or `null`
      parent = document.querySelector(container);
    }
    // If container <element> found
    if (parent) {
      // gets/sets the height/width ratio
      maxW = window.getComputedStyle(parent, null).getPropertyValue('max-width');
      styles.width = '100%';
      // calc is needed here b/c the maxW measurement type is unknown
      styles.maxHeight = `calc(${maxW} * ${h} / ${w})`;
    } else {
      // gets/sets the height/width ratio
      // => if a targeted <element> closest parent <element> is NOT defined
      parent = frame.parentElement;
      let maxH;
      styles.display = 'block';
      styles.marginLeft = 'auto';
      styles.marginRight = 'auto';
      let fullW = maxW;
      // if targeted <element> width is > than it's parent <element>
      // => set the targeted <element> maxheight/fullwidth to it's parent <element>
      if (w > parent.offsetWidth) {
        fullW = parent.offsetWidth;
        maxH = fullW * h / w;
      } else maxH = w * (h / w);
      styles.maxHeight = `${maxH}px`;
      styles.width = fullW;
    }
    // set a calculated height of the targeted <element>
    const cssHeight = 100 * h / w;
    styles.height = `${cssHeight}vw`;
    styles.maxWidth = '100%';
  }
}
