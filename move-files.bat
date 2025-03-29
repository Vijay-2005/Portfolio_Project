@echo off
REM Create directories if they don't exist
mkdir public\img
mkdir public\svg
mkdir public\document

REM Move image files with proper renaming
move img\perfil-icon.jpg public\img\profile-icon.jpg
move img\img-background.jpg public\img\background.jpg
move img\img1.jpg public\img\hero-image.jpg
move img\git.gif public\img\github-icon.gif
move img\linkedin.gif public\img\linkedin-icon.gif
move img\x.gif public\img\twitter-icon.gif
move img\hashnode3.png public\img\hashnode-icon.png
move img\favicon.ico public\img\favicon.ico
move "img\food.png" public\img\food-project.png
move "img\weather.png" public\img\weather-app.png
move "img\Screenshot 2024-03-17 102746.png" public\img\infinity-project.png
move "img\Screenshot 2024-12-02 223709.png" public\img\currency-converter.png

REM Move SVG files
move svg\html.svg public\svg\html.svg
move svg\css.svg public\svg\css.svg
move svg\js.svg public\svg\js.svg

REM Move CV
move CV-Vijay.pdf public\document\cv-vijay.pdf

echo Files moved successfully!
