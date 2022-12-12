import { BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

export function isValidId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    throw new BadRequestException('Invalid item ID');
  }
  next();
}
