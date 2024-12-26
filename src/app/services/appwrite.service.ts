import { Injectable } from '@angular/core';
import {Account, Client, Databases} from 'appwrite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  private readonly client: Client;
  private account: Account;
  private database: Databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }

  // Create a new account with email, password, and name
  createAccount(email: string, password: string, name: string) {
    return this.account.create('unique()', email, password, name);
  }

  // Log in the user with email and password
  login(email: string, password: string) {
    return this.account.createEmailPasswordSession(email, password); // Corrected Method for logging in
  }

  // Log out the current user
  logout() {
    return this.account.deleteSession('current');
  }

  // Get the current account information
  getCurrentAccount() {
    return this.account.get();
  }

  // Create a document in a specific collection in the database
  createDocument(databaseId: string, collectionId: string, data: object) {
    return this.database.createDocument(databaseId, collectionId, 'unique()', data);
  }

  // List all documents in a specific collection in the database
  listDocuments(databaseId: string, collectionId: string) {
    return this.database.listDocuments(databaseId, collectionId);
  }
}
