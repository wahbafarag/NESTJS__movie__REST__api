import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, errorMessages: 'Name is required' })
  name: string;

  @Prop({ required: true, errorMessages: 'Age is required' })
  age: number;

  @Prop({ required: true, errorMessages: 'Email is required' })
  email: string;

  @Prop({ required: true, errorMessages: 'Password is required' })
  password: string;

  @Prop({ default: false })
  isAdmin?: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
