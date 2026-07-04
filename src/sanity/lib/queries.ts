import { groq } from "next-sanity";

/* ------------------------------------------------------------------ */
/*  Portfolio Items                                                     */
/* ------------------------------------------------------------------ */

/** All portfolio items for the home page grid (ordered). */
export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    portfolioItemType,
    role,
    client,
    year,
    featuredImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    excerpt,
    order
  }
`;

/** Single portfolio item by slug (full detail with sections). */
export const portfolioItemBySlugQuery = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    portfolioItemType,
    role,
    client,
    year,
    featuredImage {
      asset->,
      alt
    },
    "categories": categories[]->title,
    excerpt,
    sections[] {
      _key,
      navLabel,
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }
  }
`;

/** All portfolio item slugs (for generateStaticParams). */
export const portfolioItemSlugsQuery = groq`
  *[_type == "portfolioItem" && defined(slug.current)]{
    "slug": slug.current
  }
`;

/* ------------------------------------------------------------------ */
/*  Bytes                                                               */
/* ------------------------------------------------------------------ */

/** All bytes for the feed (newest first). */
export const bytesQuery = groq`
  *[_type == "byte"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->title,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`;

/** Single byte by slug (full detail). */
export const byteBySlugQuery = groq`
  *[_type == "byte" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "categories": categories[]->title,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`;

/** All byte slugs (for generateStaticParams). */
export const byteSlugsQuery = groq`
  *[_type == "byte" && defined(slug.current)]{
    "slug": slug.current
  }
`;

/** Recent bytes for the home page BytesBlock. */
export const recentBytesQuery = groq`
  *[_type == "byte"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "category": categories[0]->title
  }
`;

/* ------------------------------------------------------------------ */
/*  Current Focus                                                       */
/* ------------------------------------------------------------------ */

export const currentFocusQuery = groq`
  *[_type == "currentFocus"] | order(order asc) {
    _id,
    title,
    description,
    contributions,
    contributionsHeading
  }
`;

/* ------------------------------------------------------------------ */
/*  Categories                                                          */
/* ------------------------------------------------------------------ */

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "byte" && references(^._id)])
  }
`;

/* ------------------------------------------------------------------ */
/*  Site Settings                                                       */
/* ------------------------------------------------------------------ */

/** Lightweight query for the root layout — just the favicon. */
export const faviconQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    favicon {
      asset->
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    brandName,
    tagline,
    email,
    linkedinUrl,
    githubUrl,
    copyright,
    profileImage {
      asset->,
      alt
    },
    pageHeading,
    pageDescription,
    featuredWork[]-> {
      _id,
      title,
      "slug": slug.current,
      portfolioItemType,
      client,
      year,
      isPlaceholder,
      contributionTags,
      cardMedia[] {
        _type,
        _type == "image" => {
          asset->,
          alt
        },
        _type == "cardVideo" => {
          "videoUrl": videoFile.asset->url,
          alt,
          autoplay,
          loop
        }
      },
      cardMediaMobile[] {
        _type,
        _type == "image" => {
          asset->,
          alt
        },
        _type == "cardVideo" => {
          "videoUrl": videoFile.asset->url,
          alt,
          autoplay,
          loop
        }
      },
      "categories": categories[]->title,
      excerpt
    },
    location,
    timezone,
    workingHours,
    mainNavigation[] {
      _key,
      label,
      href,
      external
    },
    footerLinks[] {
      _key,
      label,
      href
    }
  }
`;
