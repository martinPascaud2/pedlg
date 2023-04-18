#!/bin/bash
usage="usage: ./seedVarietyOneUser [want | stock | both] [number of varieties to add (< 300)] Token "
both=''

if [ -z "$2" ]; then
    echo $usage
    exit 1
 elif [ $2 -gt 2001 ]; then
     len=300
else
    len=$2
fi

if [ -z "$3" ]; then
    echo "Error: Token not found."
    echo $usage
    exit 1
fi

for i in $( seq 1 $len ); do
    if [ $1 = 'both' ]; then
        if [ "$both" = 'stock' ]; then
            both='want'
        else
            both='stock'
        fi
    fi

    if [ $1 = 'want' ] || [ "$both" = 'want' ]; then
        data="{\"query\":\"mutation{addWant(varietyId:$(echo $i)){userId}}\"}"
    elif [ $1 = 'stock' ] || [ "$both" = 'stock' ]; then
        data="{\"query\":\"mutation{addStock(unit:number,varietyId:$(echo $i),quantity:100,shared:true,sharedQuantity:50){userId}}\"}"
    else
        echo $usage
        exit 1
    fi

    curl --request POST --url http://localhost:4000/api --header "authorization: Bearer $3" --header "content-type: application/json" --data $data
done
