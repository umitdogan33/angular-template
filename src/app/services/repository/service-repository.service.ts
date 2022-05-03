import { ResponseModel } from './../../models/resposeModel';
import { SingleResponseModel } from './../../models/singleResponseModel';
import { ListResponseModel } from './../../models/listResponseModel';
import { Observable, ObservableLike } from 'rxjs';

export interface ServiceRepositoryService<tEntity,tId> {

  getAll():Observable<ListResponseModel<tEntity>>
  getById(id:tId):Observable<SingleResponseModel<tEntity>>
  add(entity:tEntity):Observable<ResponseModel>
  delete(id:tId):Observable<ResponseModel>
  update(id:tId):Observable<ResponseModel>

}
