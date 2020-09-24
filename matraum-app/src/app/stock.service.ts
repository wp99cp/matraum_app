import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stock: Stock;

  constructor(private db: AngularFirestore) {
  }

  public async getMaterialById(id: number): Promise<Material> {

    // Check if stock exist
    if (!this.stock) {
      await this.loadStock();
    }
    // Check if data are older than 60 Minutes
    else if (Date.now() - this.stock.timestamp > 3.6E6) {
      await this.loadStock();
    }

    // Check if Id exists
    const material = this.stock.materials[id];
    if (material === undefined) {
      throw new Error('ID do not exist!');
    }

    return material;

  }

  private async loadStock(): Promise<void> {

    console.log('load stock from database');

    const stockRef = this.db.doc('sharedData/stock').get();
    await new Promise(resolve => {

      stockRef.subscribe(ref => {

        if (!ref) {
          throw new Error('Could not load data!');
        }

        this.stock = {
          timestamp: Date.now(),
          materials: ref.data() as { id: Material }
        };

        resolve();

      });
    });

  }

}

export interface Stock {

  timestamp: number;
  materials: { id: Material };

}

export interface Material {

  category: string;
  description: string;
  material: string;
  stock: number;
  weight: number;

}
