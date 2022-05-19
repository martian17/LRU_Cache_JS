class LRU{
    constructor(size){
        this.cache = {};
        this.maxsize = size;
        this.size = 0;
        //append to head
        this.head = null;
        this.tail = null;
    }
    get(idx){
        let cache = this.cache;
        if(idx in cache){
            //bring it to the head of the queue
            this.moveToHead(idx);
            return cache[idx].val;
        }else{
            if(this.size >= this.maxsize){
                //remove the tail
                let tail = this.tail;
                this.tail = tail.prev;
                this.tail.next = null;
                delete cache[tail.idx];
                this.size--;
            }
            //create a new value
            let val = this.create(idx);
            let head = this.head;
            let node = {
                val:val,
                idx,
                prev:null,
                next:this.head
            };
            cache[idx] = node;
            this.size++;
            if(head){
                head.prev = node;
            }
            this.head = node;
            if(!this.tail){
                this.tail = node;
            }
            return val;
        }
    }
    moveToHead(idx){
        let node = this.cache[idx];
        let prev = node.prev;
        let next = node.next;
        //handshake
        if(!prev){
            //this is the head, nothing to be done
            return;
        }
        prev.next = next;
        if(next){
            next.prev = prev;
        }
        let head = this.head;
        head.prev = node;
        node.next = head;
        node.prev = null;
        this.head = node;
    }
    toArray(){
        let arr = [];
        let node = this.head;
        while(node){
            arr.push(node);
            node = node.next;
        }
        return arr;
    }
    inspect(){
        console.log(this.cache);
        console.log(this.toArray().map(n=>n.val));
    }
    create(){
        //dummy, defined in derived classes
    }
};
