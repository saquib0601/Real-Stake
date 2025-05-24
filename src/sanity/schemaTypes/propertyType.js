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
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'High Yield', value: 'high-yield'},
          {title: 'Standard', value: 'standard'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Fully Funded', value: 'fully-funded'},
          {title: 'Coming Soon', value: 'coming-soon'},
        ],
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
      name: 'funded',
      title: 'Funded Percentage',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'totalReturn',
      title: 'Total Return',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'yearlyReturn',
      title: 'Yearly Return',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'netYield',
      title: 'Net Yield',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'investmentDetails',
      title: 'Investment Details',
      type: 'object',
      fields: [
        defineField({
          name: 'minimumInvestment',
          title: 'Minimum Investment',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'targetReturn',
          title: 'Target Return',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'projectedRentalYield',
          title: 'Projected Rental Yield',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'investmentPeriod',
          title: 'Investment Period',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'expectedROI',
          title: 'Expected ROI',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Category',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Industrial', value: 'industrial'},
          {title: 'Land', value: 'land'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ready',
      title: 'Ready for Investment',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'rented',
      title: 'Currently Rented',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'propertyName',
      images: 'images',
      price: 'price',
      status: 'status',
      type: 'type',
    },
    prepare(selection) {
      const {price, images, status, type} = selection
      const mainImage = images?.find(img => img.isMainImage) || images?.[0]
      return {
        ...selection,
        media: mainImage,
        subtitle: `${status} • ${type} • $${price?.toLocaleString()}`,
      }
    },
  },
}) 