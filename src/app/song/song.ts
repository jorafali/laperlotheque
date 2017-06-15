export class Song {

	public id: any;
	public coordinates: [number, number];
	public title: string;
	public artist: string;
	public trackUrl: string;
	public published?: boolean;
	public description?: string;
	public tags?: Array<string>;
	public thumbnailUrl?: string;

	public static emptySong: Song = {
		id: null,
		coordinates: [null, null],
		title: null,
		artist: null,
		trackUrl: null
	}

	constructor(obj: {
		id: any,
		coordinates: [number, number],
		title: string,
		artist: string,
		trackUrl: string,
		published?: boolean,
		description?: string,
		tags?: Array<string>,
		thumbnailUrl? : string,
		metrics?: any 
	}){
		this.id= obj.id;
		this.coordinates = obj.coordinates;
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
