# Use nginx to serve the built app
FROM nginx:alpine

# Copy built files to nginx
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration for proper video handling
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx config that conflicts with our setup
RUN rm -f /etc/nginx/conf.d/default.conf

# Note: Video files are excluded from deployment

# Expose port 80
EXPOSE 80

# Start nginx with environment variable substitution
CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf > /tmp/nginx.conf && nginx -g 'daemon off;' -c /tmp/nginx.conf"]



