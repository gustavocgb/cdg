import {AddressCache} from "../../rules/addressCache/addressCache";
import {SqlRepository} from "../../rules/repositories/sqlRepository/sqlRepository";

export class AddressCacheConcrete extends AddressCache{

    readonly addressRepository: SqlRepository
    private array: any = []
    private reference: any
    private take: any
    private isBlock: boolean = false

    constructor(addressRepository: SqlRepository, array?: [], reference?: any, take?: any) {
        super()
        this.addressRepository = addressRepository
        this.array = array
        this.reference = reference
        this.take = take
    }

    getArray() {
        return this.array
    }
    setArray(array: []) {
        this.array = array
    }
    getReference() {
        return this.reference
    }
    setReference(reference: any) {
        this.reference = reference
    }

    async push() {
        this.isBlock = true
        await new Promise(async (resolve, reject) => {
            try {
                let addressArray = await this.addressRepository.getAll({
                    reference: {id: {id: this.reference}},
                    skip: 1,
                    take: this.take,
                    orderBy: {where: {id: 'asc'}}
                })
                this.reference = addressArray[addressArray.length - 1].id
                addressArray.forEach((address: any) => {
                    this.array.push(address)
                })
                this.isBlock = false
                resolve('ok')
            } catch (e) {
                this.isBlock = false
                reject('error')
            }
        })
    }

    async pop() {
        return this.array.shift()
    }

    async criticalZone(stack: boolean) {
        return await new Promise(async (resolve, reject) => {
            let check: any
            try {
                if ((!stack && this.array.length == Math.round((this.array.length/2))) || this.array.length == 0) {
                    if (!this.isBlock) {
                        await this.push()
                    }
                }
                check = setInterval(async ()=>{
                    if (this.array.length != 0) {
                        resolve(this.pop())
                        await clearInterval(check)
                    } else {
                        if (!this.isBlock) {
                            try {
                                await this.push()
                                resolve(this.pop())
                                await clearInterval(check)
                            } catch (e) {
                                reject(e)
                                await clearInterval(check)
                            }
                        }
                    }
                }, 10)
            } catch (e) {
                reject(e)
                await clearInterval(check)
            }
        })
    }

    async queue() {
        return await this.criticalZone(false)
    }

    async stack() {
        return await this.criticalZone(true)
    }
}

