import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  companyId: Types.ObjectId;
  location?: string;
  salaryRange?: string;
  skillsRequired?: string[];
  status: 'open' | 'closed';
  postedAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    location: { type: String, trim: true },
    salaryRange: { type: String, trim: true },
    skillsRequired: [{ type: String, trim: true }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', JobSchema);
