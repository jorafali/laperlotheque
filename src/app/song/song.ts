export class Song {

	public id: any;
	public coordinates: [number, number];
	public userId: any;
	public title: string;
	public artist: string;
	public published: boolean;
	public trackUrl : string;
	public description?: string;
	public tags?: Array<string>;
	public thumbnailUrl?: string;

	public static emptySong: Song = {
		id: null,
		coordinates: [null, null],
		userId: null,
		title: null,
		artist: null,
		published: null,
		trackUrl: null
	}

	constructor(obj: {
		id: any,
		coordinates: [number, number],
		userId: any,
		title: string,
		artist: string,
		published: boolean,
		description?: string,
		tags?: Array<string>,
		trackUrl? : string,
		thumbnailUrl? : string,
		metrics?: any 
	}){
		this.id= obj.id;
		this.coordinates = obj.coordinates;
		this.userId= obj.userId;
		this.title= obj.title;
		this.artist= obj.artist;
		this.published= obj.published;
		this.description= obj.description;
		this.tags= obj.tags;
		this.trackUrl = obj.trackUrl;
		this.thumbnailUrl = (obj.thumbnailUrl == 'file')?'api/songs/'+this.id+'/image/thumbnail': obj.thumbnailUrl;
		this.trackUrl = (obj.trackUrl == 'file')?'api/songs/'+this.id+'/stream': obj.trackUrl;
	}
}
