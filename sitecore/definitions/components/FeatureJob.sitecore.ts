// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the FeatureJob component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function FeatureJob(manifest: Manifest): void {
  manifest.addComponent({
    name: 'FeatureJob',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'Title', type: CommonFieldTypes.SingleLineText },
      { name: 'Description', type: CommonFieldTypes.SingleLineText },
      { name: 'CompanyName', type: CommonFieldTypes.SingleLineText },
      { name: 'Location', type: CommonFieldTypes.SingleLineText },
      { name: 'JobType', type: CommonFieldTypes.SingleLineText },
      { name: 'JobId', type: CommonFieldTypes.SingleLineText },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
