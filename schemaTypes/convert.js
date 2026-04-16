const fs = require('fs');
const csv = require('csv-parser');
const slugify = require('slugify');

// Update this to match whichever of the two files you are parsing
const inputFile = 'seo.csv'; 
const outputFile = 'miki_materials.jsonl';

fs.writeFileSync(outputFile, ''); // Clear the output file

let processedCount = 0;

console.log(`Starting conversion of ${inputFile}...`);

fs.createReadStream(inputFile)
  .pipe(csv()) // No skipLines needed for this clean file!
  .on('data', (row) => {
    // 1. Extract the primary key
    const productName = row['product_name_common'] ? row['product_name_common'].trim() : '';

    // Skip empty rows
    if (!productName) return;

    // 2. Map the Sanity Schema using the new clean headers
    const sanityDocument = {
      _type: 'opticalMaterial', // Keep your existing Sanity document type
      
      // Core Product Info
      productId: row['product_id'] || '',
      productCode: row['product_code'] || '',
      productName: productName,
      iupacName: row['product_name_iupac'] || '',
      casNumber: row['cas_number'] || '',
      tscaStatus: row['tsca'] || '',
      category: row['category'] || '',
      
      // Generate the slug from the common name
      slug: {
        _type: 'slug',
        current: slugify(productName, { lower: true, strict: true }),
      },
      
      // Descriptions & Features
      descriptionShort: row['description_short'] || '',
      descriptionLong: row['description_long'] || '',
      // Convert pipe-separated strings into arrays if you want them as lists in Sanity
      featureBullets: row['feature_bullets'] ? row['feature_bullets'].split('|').map(s => s.trim()) : [],
      applicationTags: row['application_tags'] ? row['application_tags'].split(',').map(s => s.trim()) : [],
      
      // SEO Metadata (Perfect for Next.js metadata generation!)
      seo: {
        title: row['seo_title'] || '',
        metaDescription: row['seo_meta_description'] || '',
        keywords: row['seo_keywords'] || ''
      },

      // Specifications (Tg, Melting Point, Dk, Df)
      specifications: {
        tg_c: row['spec_tg_c'] || null,
        mp_c: row['spec_mp_c'] || null,
        dielectricConstant: row['spec_dk'] || null,
        dissipationFactor: row['spec_df'] || null,
      }
    };

    // 3. Convert to NDJSON and append
    const jsonlString = JSON.stringify(sanityDocument) + '\n';
    fs.appendFileSync(outputFile, jsonlString);
    
    processedCount++;
  })
  .on('end', () => {
    console.log('✅ CSV Parsing Complete!');
    console.log(`Successfully mapped ${processedCount} rich SEO records into ${outputFile}.`);
  })
  .on('error', (error) => {
    console.error('❌ Error parsing the CSV:', error);
  });