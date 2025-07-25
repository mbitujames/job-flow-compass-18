import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  description: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema<ICompany>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    location: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>('Company', CompanySchema);
