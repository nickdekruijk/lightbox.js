# lightbox.js
A basic lightbox plugin. Fully customisable with CSS.


## Usage
HTML:
```html
<a href="/path/to/bigimage1.jpg" rel="lightbox" data-caption="Caption 1"><img src="/path/to/thumbnail1.jpg" alt=""></a>
<a href="/path/to/bigimage2.jpg" rel="lightbox" data-caption="Caption 2"><img src="/path/to/thumbnail2.jpg" alt=""></a>
<a href="/path/to/bigimage3.jpg" rel="lightbox" data-caption="Caption 3"><img src="/path/to/thumbnail3.jpg" alt=""></a>
<a href="/path/to/bigimage4.jpg" rel="lightbox" data-caption="Caption 4"><img src="/path/to/thumbnail4.jpg" alt=""></a>
```

### CSS
Style your lightbox however you want. For example:
```css
lightbox .caption {position:absolute;bottom:5%;right:5%;color:#fff}
lightbox .close {position:absolute;top:3%;right:3%;color:#fff}
lightbox .close:after {content:'×'}
```

### JS
```javascript
$('A[rel=lightbox]').lightbox({
    option1:'value1',
    option2:'value2'
});
```

### Options: default value|other options
```
arrowkeys: true|false             # Enable keyboard left and right arrow keys
touchwipe: true|false             # Enable touch device left and right swipe gestures
fadeIn: 400                       # Fade in animation time when showing lightbox
fadeOut: 300                      # Fade out animation time when closing lightbox
captionClass: 'caption'           # CSS Class to apply to the image caption DIV
background: 'rgba(0, 0, 0, 0.7)'  # Overlay background color
```
