######

--- COMMANDS ---

gulp - compile all files and serve web
gulp serve - serve without compiling

Add your files to src folder

Add your images and svg to assets/compress folder

To import files use @@webRoot instead of ./

Example:

-- WRONG --

  <head>
    <script src="/js/main.js"></script>
  </head>
  <body>
    <img src="assets/GB_Ext_1-1.webp" alt="" />
  </body>

-- CORRECT --

  <head>
    <script src="@@webRoot/js/main.js"></script>
  </head>
  <body>
    <img src="@@webRoot/assets/GB_Ext_1-1.webp"/>
  </body>

--\_COMPONENTS---

Store components (header, footer, etc..) inside src/components folder

Import of \_header.html and \_footer.html from src/components folder to index.html:

  <head>
    <script src="@@webRoot/js/main.js"></script>
  </head>
  <body>
    @@include("_header.html"):
    <img src="@@webRoot/assets/GB_Ext_1-1.webp"/>
    @@include("_footer.html"):
  </body>
# GS-GULP_TEMPLATE
