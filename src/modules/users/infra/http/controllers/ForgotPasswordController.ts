import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordService from '../../../services/SendForgotPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgot = container.resolve(SendForgotPasswordService);

    await sendForgot.execute({ email });

    return response.status(204).json();
  }
}
