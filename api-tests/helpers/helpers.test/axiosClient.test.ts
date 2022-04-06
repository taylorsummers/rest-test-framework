import axios from 'axios';
import BookHelper from '../../generators/bookGenerator';
import AxiosHelper from '../axiosClient.helper';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios Helper', () => {
  it('AxiosHelper.post Should call an axios post', async () => {
    const mockReturn = BookHelper.randomBookData('123');
    mockedAxios.get.mockResolvedValue({status: 200, data: {mockReturn}});
    const result = await AxiosHelper.get('123');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockReturn);
  });
});
