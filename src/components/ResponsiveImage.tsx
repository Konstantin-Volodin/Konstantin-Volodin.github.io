import React from 'react';
import { Box, Image as ChakraImage, ImageProps } from '@chakra-ui/react';

interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * ResponsiveImage component that provides:
 * - WebP format with JPEG/PNG fallback
 * - Multiple image sizes with srcset
 * - Responsive sizing with sizes attribute
 * - Optimized loading attributes
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props
}) => {
  // Extract base name and extension from src
  const getBaseName = (imageSrc: string) => {
    const parts = imageSrc.split('.');
    const extension = parts.pop();
    const baseName = parts.join('.');
    return { baseName, extension };
  };

  const { baseName, extension } = getBaseName(src);

  // Generate srcset for different formats and sizes
  const generateSrcSet = (format: string) => {
    const ext = format === 'webp' ? 'webp' : extension;
    return [
      `${baseName}-400w.${ext} 400w`,
      `${baseName}-800w.${ext} 800w`,
      `${baseName}.${ext} 1200w`
    ].join(', ');
  };

  const webpSrcSet = generateSrcSet('webp');
  const fallbackSrcSet = generateSrcSet('fallback');

  return (
    <Box as="picture" {...props}>
      {/* WebP format with srcset */}
      <source
        srcSet={webpSrcSet}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* Fallback format (JPEG/PNG) with srcset */}
      <ChakraImage
        src={src}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'low'}
        {...props}
        // Remove the Box props that shouldn't be passed to img
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        style={undefined}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        className={undefined}
      />
    </Box>
  );
};

export default ResponsiveImage;