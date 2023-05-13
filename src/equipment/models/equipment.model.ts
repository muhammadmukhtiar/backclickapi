import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';

@Table
export class Equipment extends Model {

  @Column
  title: string;

  @Column
  description: string;

  @Column
  inService: string;

  @Column
  logo: string;

  @Column
  type: string;

  @Column
  companyId: string;

  @Column
  employeeId: string;

  @Column
  equipmentCode: string;

  @Column
  serialNumber: string;

  @Column
  brand: string;

  @Column
  modelNumber: string;

  @Column
  series: string;

  @Column
  identifier: string;

  @Column
  processorBrand: string;

  @Column
  processorSeries: string;

  @Column
  processorGeneration: string;

  @Column
  memory: string;

  @Column
  hdd: string;

  @Column
  graphicCard: string;

  @Column
  screenSize: string;


  @Column
  screenType: string;

  @Column
  resolution: string;

  @Column
  formFactor: string;

  @Column
  operatingSystem: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  location: string;

  @Column
  inWarranty: string;

  @Column
  warrantyStartDate: string;

  @Column
  warrantyEndDate: string;

  @Column
  inSupport: string;

  @Column
  supportStartDate: string;

  @Column
  supportEndDate: string;

  @Column
  financingType: string;

  @Column
  purchaseCost: string;

  @Column
  category: string;

  @Column
  condition: string;

  @Column
  status: string;

  @Column
  purchaseInvoiceNumber: string;

  @Column
  purchaseDate: string;

  @Column
  rentOrPurchasePrice: string;

  @Column
  vendorName: string

  @Column
  contactName: string

  @Column
  contactNumber: string

  @Column
  quantityPurchased: string

  @Column
  financingSerialNumber: string

  @Column
  comments: string

  @Column({ defaultValue: false })
  isDeleted: string

  @Column
  additional_specifications: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => EquipmentAttachment, 'equipmentId')
  attachments: EquipmentAttachment[]
}