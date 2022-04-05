import {EnvConfig} from '../config/envConfig.model';
// eslint-disable-next-line node/no-unpublished-import
import {ApiGatewayServiceClient} from '@google-cloud/api-gateway';

const envConfig: EnvConfig = (process as any).envConfig;
const projectId = envConfig.projectId;

class ApiGatewayHelper {
  private client = new ApiGatewayServiceClient();
  public listApis = async (): Promise<unknown> => {
    const [apis] = await this.client.listApis({
      parent: `projects/${projectId}/locations/global`,
    });
    return apis;
  };
}

export default ApiGatewayHelper;
