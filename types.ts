export type Ad = {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    userType: 'trader' | 'marketer';
    image: {
        id: string;
        description: string;
        imageUrl: string;
        imageHint: string;
    }
};

    