# Use nginx to serve the built app
FROM nginx:alpine

# Copy built files to nginx
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration for proper video handling
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx config that conflicts with our setup
RUN rm -f /etc/nginx/conf.d/default.conf

# Fix permissions for video files
RUN chmod -R 644 /usr/share/nginx/html/assets/*.mp4

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]



