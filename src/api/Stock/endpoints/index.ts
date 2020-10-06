import stockApi from "../config";

class StockService {


  async getSUb(): Promise<any> {
    return stockApi.get('/subsidiaries');
  }

  async createDocument(data: any): Promise<any> {
    
    return stockApi.post('/documents', data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async buyProducts(data: any): Promise<any> {
    return stockApi.post('/product-movement', {
      type: 'BUY',
      ...data,
    })
  }

}

export default new StockService();