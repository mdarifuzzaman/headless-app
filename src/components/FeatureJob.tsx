import { constants, Field, GraphQLRequestClient, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';
import config from 'temp/config';

type FeatureJobProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    CompanyName: Field<string>;
    Location: Field<string>;
    JobType: Field<string>;
    JobId: Field<string>;
  };
};

const FeatureJob = (props: FeatureJobProps): JSX.Element => {
  const [itemId, setItemId] = useState("");
  console.log('Params', props.params);
  console.log('Rendering', props.rendering);
  useEffect(() => {
    async function loadItem (){
      const data = await getItemDetails(props.rendering.dataSource!);
      console.log("item data", data);
      setItemId(data?.item.id);
    }
    loadItem();

  }, []);
  return (
    <div className="journey-templates-card" key={itemId}>
      <div className='journey-templates-card-header'>
        <div className='journey-templates-card-header-left'>
          <div className='journey-templates-card-header-lifecycle-icon'></div>
          <div className='journey-templates-card-header-lifecycle'>Hot Jobs</div>
        </div>        
      </div>
      <div className='journey-templates-card-ribbon'>IT Jobs</div>
      <div className="journey-templates-card-content">
        <div className='journey-templates-card-content-name'>{props.fields.Title?.value}</div>       
        <div className='journey-templates-card-content-description'>
          {props.fields.Description.value}
        </div>
        {/* <p>{props.fields.CompanyName?.value}</p>
        <p>{props.fields.Location?.value}</p>
        <p>{props.fields.JobType?.value}</p>         */}
      </div>
      <div className='journey-templates-card-footer'>
        <a className='tile-tag slds-float_right' href={'/job?jobId=' + itemId}>
            View Job
          </a>
      </div>
    </div>
  );
};

const getItemDetails = async (path: string) => {
  console.log('Inside server side props..');
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
  });

  const query = `{
    item(path: "${path}", language: "en"){            
      id
    }
  }`;

  const result = await graphQLClient.request<any>(query);
  console.log('Item id', result);
  return result;
};

export default withDatasourceCheck()<FeatureJobProps>(FeatureJob);
