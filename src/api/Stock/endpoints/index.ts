import stockApi from "../config";

interface ProductDepositMovement {
  depositId: number
  productId: number
  price?: number
  quantity: number
}

class StockService {

  async buyProducts(data: ProductDepositMovement) {
    stockApi.post('/product-movement', {
      type: 'BUY',
      ...data
    })
  }

}

export default new StockService();