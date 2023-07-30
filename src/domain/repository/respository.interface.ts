// Repository deve ser criado por agregado, ou seja o find vai me retornar o meu agregado.
export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
