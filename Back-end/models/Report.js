const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
    city: { type: String },
  },
  { _id: false }
);

const ReportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    location: { type: LocationSchema, default: null },
    status: { type: String, enum: ['pending', 'inProgress', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', ReportSchema);
