const banner = {
    name: 'banner',
    type: 'document',
    title: 'Banner',
    fields: [
      {
        name: 'heading',
        type: 'string',
        title: 'Heading',
      },
      {
        name: 'paragraph',
        type: 'text',
        title: 'Paragraph',
        description: 'Write a detailed description or content for this section.',
      },
      {
        name: 'buttonText',
        type: 'string',
        title: 'Button Text',
        description: 'Text for the button, e.g., "Learn More" or "Shop Now".',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: { hotspot: true },
      }
    ],
  };
  export default banner;