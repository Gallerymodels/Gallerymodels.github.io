import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "x3ce86hh",
  dataset: "production",
  apiVersion: "2024-05-16",
  useCdn: true
 ,
});
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
export async function getModels() {
  const data = await sanityClient.fetch(`*[_type == "model"]{
    title,
    description,
    date,
    photos[]{
      image,
      alt,
      isPortrait,
      metadata {
        author,
        
      }
    }
  } | order(date desc)`);
  return data;
}

export async function getGear() {
  const data = await sanityClient.fetch(`*[_type == "gear"]{
    title,
    description,
    price
  }`)
  return data
}