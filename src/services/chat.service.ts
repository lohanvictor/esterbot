import {EsterMessage, EsterRequest} from '../views/Chat';
import {api} from './api';

export class ChatService {
  static async postMessage(body: EsterRequest): Promise<EsterMessage> {
    const response = await api.post<EsterMessage>('/text', body);
    return response.data;
  }

  static async getAllMessages(client_id: string): Promise<EsterMessage[]> {
    const params = {client_id};
    const response = await api.get<EsterMessage[]>('/existing-service', {
      params,
    });
    return response.data;
  }

  static async finishMessage(client_id: string): Promise<void> {
    const params = {client_id};
    await api.delete('/finish-service', {params});
  }
}
