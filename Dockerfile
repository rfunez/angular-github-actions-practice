FROM nginx:alpine
COPY dist/angular-github-actions-practice/browser /usr/share/nginx/html
EXPOSE 80
