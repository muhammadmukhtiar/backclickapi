import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class EquipmentOffer extends Model {

  @Column
  offerPrice: string;

  @Column
  warrantyStartDate: string;

  @Column
  warrantyPeriod: string;

  @Column
  vendorCompany: string;
  
  @Column
  contactName: string;

  @Column
  contactNumber: string;

  @Column
  contactEmail: string;

  @Column
  equipmentQuantity: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  
  @Column
  equipmentId: string;
  	
}