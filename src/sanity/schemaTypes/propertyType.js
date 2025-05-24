import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'propertyName',
      title: 'Property Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'propertyName',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'revenue',
      title: 'Annual Revenue',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'numberOfShares',
      title: 'Number of Shares',
      type: 'number',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'images',
      title: 'Property Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
            defineField({
              name: 'isMainImage',
              type: 'boolean',
              title: 'Is Main Image',
              description: 'Set this as the main image for the property',
              initialValue: false,
            }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Industrial', value: 'industrial'},
          {title: 'Land', value: 'land'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'propertyName',
      images: 'images',
      price: 'price',
    },
    prepare(selection) {
      const {price, images} = selection
      const mainImage = images?.find(img => img.isMainImage) || images?.[0]
      return {
        ...selection,
        media: mainImage,
        subtitle: price && `$${price.toLocaleString()}`,
      }
    },
  },
}) 